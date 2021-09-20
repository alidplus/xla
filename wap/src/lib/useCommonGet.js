import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import ducks from "./../store/services";
=======
import ducks from "../store/services";
>>>>>>> 868ebcb7b9d6b2a8f67025c7361881781b381e79

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
