import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import ducks from "./../store/services";

export default function useCommonGet(serviceName, id = null) {
  const dispatch = useDispatch();
  const single = useSelector(state => ducks[serviceName].selectors.get(state, { id }));
  const get = (uid, query) => dispatch(ducks[serviceName].creators.find(uid, query));

  useEffect(() => {
    if (id && (!single || single._id !== id))
      get(id)
  }, [id])

  return single
}
