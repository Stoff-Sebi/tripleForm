import React, {useEffect} from "react";

interface Props {
    windowConfigPropName: string,
    setConfig: Function
}

/**
 * Component checks if the global config object was assigned and 
 * sets state of parent component. (for the configuration)
 */
const ConfigProvider: React.FC<Props> = ({windowConfigPropName = undefined, setConfig = undefined}) => {

    useEffect(()=>{
        if(!setConfig || !windowConfigPropName)return;
        //@ts-ignore
        setConfig(window[windowConfigPropName]);
    }, [setConfig, windowConfigPropName]);
 
    return null;
}

export default ConfigProvider;