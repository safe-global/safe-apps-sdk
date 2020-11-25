import React, { ReactNode } from 'react'
import connectSafe, { Safe } from './safe'

const SafeContext = React.createContext<Safe|undefined>(undefined)

interface Props {
    loading?: ReactNode
}

export const SafeProvider: React.FC<Props> = ({ loading, children }) => {
    const [safe] = React.useState(connectSafe());
    const [connected, setConnected] = React.useState(false);
    React.useEffect(() => {
        safe.activate(() => {
            setConnected(safe.isConnected())
        })

        return () => safe.deactivate();
    }, [safe]);

    return (
        <div className="App">
            {(connected ?
                <SafeContext.Provider value={safe}>
                    {children}
                </SafeContext.Provider> :
                loading
            )}
        </div>
    )
}
export const useSafe = (): Safe => {
    const value = React.useContext(SafeContext)
    if (value == undefined) {
        throw new Error('You probably forgot to put <SafeProvider>.');
    }
    return value;
}

export default SafeProvider