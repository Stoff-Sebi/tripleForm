import React, { useEffect } from "react";

interface Props {
  windowConfigPropName?: string;
  configUrl?: string;
  setConfig: Function;
}

/**
 * Component checks if the global config object was assigned and
 * sets state of parent component. (for the configuration)
 */
const ConfigProvider: React.FC<Props> = ({
  windowConfigPropName = undefined,
  configUrl = undefined,
  setConfig = undefined
}) => {
  useEffect(() => {
    if (!setConfig) return;
    if (windowConfigPropName && configUrl)
      throw new TypeError(
        `Do not define a window property AND an url for the configuration! Given url: ${configUrl}. Given window property name: ${windowConfigPropName}`
      );
    if (windowConfigPropName)
      return setConfig(window[windowConfigPropName as any]);

    //fetch url get config json.  
    if (configUrl) { 
      fetch(configUrl)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          setConfig(myJson);
        }).catch(error => {
            console.error(`Error at trying to load configuration from url: "${configUrl}". `, error);
        });
    }
  }, [setConfig, windowConfigPropName, configUrl]);

  return null;
};

export default ConfigProvider;
