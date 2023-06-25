import {useState} from "react";
import {notification} from "antd";
import {isPromise} from "../utils/typeof.js";
import {getCodeResponse, getMessageResponse, getResultResponse, isErrorResponse} from "../utils/api_service.js";

const useCallApi = ({
                      success,
                      callApi,
                      error = undefined,
                      useToastShowError = false,
                    }) => {
  const [loading, setLoading] = useState(false);

  const send = (params) => {
    return new Promise((resolve, reject) => {
      const rs = callApi(params);
      if (!isPromise(rs)) {
        reject({});
        return;
      }
      setLoading(true);
      rs.then((dataFromServer) => {
        setLoading(false);
        if (
          isErrorResponse(dataFromServer) ||
          isErrorResponse(dataFromServer.data) ||
          dataFromServer.status >= 400
        ) {
          const errorMessage = getMessageResponse(dataFromServer.data);
          if (useToastShowError) {
            notification.error({
              message: "Error",
              description: errorMessage
            });
          }
          reject({
            code: getCodeResponse(dataFromServer),
            message: errorMessage,
            raw: dataFromServer,
          });
          if (error) {
            error({
              code: getCodeResponse(dataFromServer),
              message: errorMessage,
              raw: dataFromServer,
            });
          }
        } else {
          resolve(getResultResponse(dataFromServer?.data), params);
          if (success) {
            success(getResultResponse(dataFromServer?.data), params);
          }
        }
      }).catch(function (thrown) {
        setLoading(false);
        const message = getMessageResponse(thrown);
        if (message) {
          if (useToastShowError) {
            notification.error({
              message: "Error",
              description: message
            });
          }

          reject({
            code: getCodeResponse(thrown),
            message: message,
            raw: thrown,
          });
          if (error) {
            error({
              code: getCodeResponse(thrown),
              message: message,
              raw: thrown,
            });
          }
        }
      });
    });
  };

  return {
    loading,
    send,
  };
};

export default useCallApi;