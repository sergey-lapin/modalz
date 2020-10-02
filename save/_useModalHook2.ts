//
// import React from 'react';
// import ReactDOM from 'react-dom';

// export const useModalHook = (component: React.FunctionComponent<any>) => {
//     const modal = React.useMemo(() => component, []);

//     let closeMeCallback = React.useCallback((event: KeyboardEvent) => {
//         if (event.keyCode == 27) {
//             onClose(event);
//         }
//     }, [])

//     React.useEffect(() => {
//         document.addEventListener('keyup', closeMeCallback);

//         return () => {
//             document.removeEventListener('keyup', closeMeCallback);
//         }
//     }, [])

//     return {}
// }
