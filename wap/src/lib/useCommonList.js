import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import ducks from "../store/services";

const emptyArray = []
const emptyQuery = {}

export default function useCommonList(serviceName, uid, query = emptyQuery) {
  if (!serviceName || !ducks[serviceName]) throw new Error('serviceName is missing or wrong')
  if (!uid) throw new Error('uid is missing. please use a unique kebab-case id for uid on each use')
  const dispatch = useDispatch();
  const array = useSelector(state => ducks[serviceName].selectors.list(state, { uid }));
  const list = (uid, query) => dispatch(ducks[serviceName].creators.list(uid, query));

  useEffect(() => {
    try {
      list(uid, { ...query, $skip: 0, $limit: -1 })
    } catch (e) {
      console.log(e, '<<< list container error')
      alert('list container error')
    }
  }, [query])

  return array?.data ?? emptyArray
}
