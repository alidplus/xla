import produce from "immer";
import Duck, {constructLocalized} from "extensible-duck";
import {createCachedSelector} from "re-reselect";
import {call, put, select, take, takeEvery} from "redux-saga/effects";
import {eventChannel, END} from "redux-saga";

const initialState = {
  queues: {},
  uploadQueue: []
};

function queueKey (props) {
  const { target, model, pathname } = props
  return `${model}/${target}/${pathname}`
}

export default (ducks, serviceName) => {
  const duck = ducks[serviceName]
  return  {
    types: ['QUEUE', 'QUEUE_UPDATE_OBJECT', 'START_UPLOAD', 'UPLOAD_PROGRESS', 'UPLOAD_END'],
    initialState: Object.assign(duck.initialState, initialState),
    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch (action.type) {
          case duck.types.QUEUE:
            state.queues[queueKey(meta)] = ([ ...payload, ...(state.queues[queueKey(meta)] || []) ]).slice(0, meta.count); break;

          case duck.types.START_UPLOAD:
            payload.forEach(qk => {
              state.queues[qk].forEach(task => {
                state.uploadQueue.push({
                  ...task,
                  progress: 0,
                  error: null,
                  queueKey: qk
                })
              })
              delete state.queues[qk]
            }); break;

          case duck.types.UPLOAD_PROGRESS: {
            const {task} = meta
            const {progress, status} = payload
            const uploadIndex = state.uploadQueue.findIndex(uq => uq.uploadId === task.uploadId)
            if (uploadIndex > -1) state.uploadQueue[uploadIndex] = {
              ...state.uploadQueue[uploadIndex],
              progress,
              status
            };
            break;
          }

          case duck.types.UPLOAD_END: {
            const {task} = meta
            const {progress, status} = payload
            const uploadIndex = state.uploadQueue.findIndex(uq => uq.uploadId === task.uploadId)
            if (uploadIndex > -1) state.uploadQueue.splice(uploadIndex, 1);
            break;
          }

          case duck.types.QUEUE_UPDATE_OBJECT: {
            const { uploadId } = meta
            const qk = queueKey(meta)
            const queueItem = (state.queues.hasOwnProperty(qk) ? state.queues[qk] : []).find(item => item.uploadId === uploadId)
            if (queueItem) {
              queueItem.url = payload
            }
            break;
          }
        }
      })
    },
    selectors: (duck) => ({
      ...constructLocalized({
        queues: (state, gState) => state.queues,
        uploadQueue: (state, gState) => state.uploadQueue,
      })(duck),
      queue: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.queues,
          selectors.props,
          (queues, props) => {
            if (!queues.hasOwnProperty(queueKey(props))) return []
            else return queues[queueKey(props)]
          }
        )( (state, props) => queueKey(props) )
      )
    }),
    creators: (duck) => ({
      queue: (files, { target, model, pathname, count }) => {
        const payload = files.map(file => {
          const url = URL.createObjectURL(file)
          return {
            fileName: file.name,
            size: file.szie,
            type: file.type,
            uploadId: url.split('/').pop(),
            target,
            model,
            pathname,
            url
          }
        })
        return {
          type: duck.types.QUEUE,
          meta: { target, model, pathname, count },
          payload
        }
      },

      updateQueuedObject: (file, { target, model, pathname, uploadId }) => {
        const payload = URL.createObjectURL(file)
        return {
          type: duck.types.QUEUE_UPDATE_OBJECT,
          meta: { target, model, pathname, uploadId },
          payload
        }
      }
    }),
    sagas: (duck) => ({
      startUpload: function* (action) {
        const { payload: { _id } } = action
        const queues = yield select(duck.selectors.queues)
        const targetQueueKeys = Object.keys(queues).filter(qk => qk.includes(_id))
        yield put({ type: duck.types.START_UPLOAD, payload: targetQueueKeys })
      },
      checkForWaitingTasks: function* () {
        let pendingTasks = 0
        let runningTasks = 0
        do {
          const uploadQueue = yield select(duck.selectors.uploadQueue)
          let pendingTask = uploadQueue.find(q => typeof q.status === 'undefined' && !q.error)
          if (pendingTask)
            yield call(duck.sagas.uploadXHR, pendingTask)
          pendingTasks = uploadQueue.filter(q => typeof q.status === 'undefined' && !q.error).length
          runningTasks = uploadQueue.filter(q => q.status === 1 && !q.error).length
        } while (pendingTasks > 0 && runningTasks < 3)
      },
      uploadXHR: function* (task) {
        const uploadChannel = yield call(() => eventChannel(emitter => {
          let formData = new FormData();
          let xhr = new XMLHttpRequest();
          xhr.upload.onload = event => { emitter({ event: 'onload', task, progress: 100, status: 2 }) }
          xhr.upload.onerror = event => { emitter({ event: 'onerror', task, progress: 100, status: -1 }) }
          xhr.upload.onabort = event => { emitter({ event: 'onerror', task, progress: 100, status: -1 }) }
          xhr.upload.onprogress = event => {
            const progress = event.loaded * 100 / Math.max(1, event.total)
            emitter({ event: 'onprogress', task, progress, status: 1 })
          }
          try {
            fetch(task.url)
              .then(res => {
                return res.blob()
              })
              .then(blob => {
                formData.append(task.uploadId, blob);
                Object.keys(task).forEach(k => {
                  formData.append(k, task[k]);
                })
                xhr.open('POST',process.env.XLA_API_URL + '/fs/uploadqueue');
                emitter({ event: 'onprogress', task, progress: 0, status: 1 })
                xhr.send(formData)
              })
          } catch (e) {
            console.log('fn send error', e)
            emitter({ event: 'onerror', task, progress: 100, status: -1 })
          }
          return () => {
            console.log('unsubscribe uploadChannel')
          }
        }))
        try {
          let ended = false
          while (true) {
            const { event, task, progress, status } = yield take(uploadChannel)
            console.log('fn while', event)
            yield put({
              type: duck.types.UPLOAD_PROGRESS,
              meta: { task },
              payload: { progress, status }
            });
            switch (event) {
              case 'onerror':
              case 'onload':
                yield put({
                  type: duck.types.UPLOAD_END,
                  meta: { task },
                  payload: { progress, status }
                });
                ended = true
                break;
            }
            if (ended) break;
          }
        } finally {
          console.log('uploadChannel terminated', task)
        }
      }
    }),

    takes: (duck) => ([
      ...(Object.values(ducks).map(d => takeEvery(d.types.PATCH_FULFILLED, duck.sagas.startUpload))),
      takeEvery(duck.types.START_UPLOAD, duck.sagas.checkForWaitingTasks),
    ])
  }
}
