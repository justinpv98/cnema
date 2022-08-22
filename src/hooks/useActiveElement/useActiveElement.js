import { useState, useEffect } from "react";
 
export default function useActiveElement() {
  // Returns the active element by listening to a focus event

 const [listenersReady, setListenersReady] = useState(false); //useful when working with autofocus
 const [activeElement, setActiveElement] = useState(document.activeElement);
 
 useEffect(() => {
   const eventListener = (event) => setActiveElement(event.target);
 
   window.addEventListener("focus", eventListener, true);
 
   setListenersReady(true);
 
   return () => {
     window.removeEventListener("focus", eventListener);
   };
 }, []);
 
 return {
   activeElement,
   listenersReady,
 };
}