import React from "react";
import style from "./ModalSuccess.module.css"


export function ModalSuccess() {
   return (
       <div className={style.awesomeModal} id="modal1"><a className={style.closeIcon} href="#close"></a>
           <h3 className={style.modalTitle}>Modal 1</h3>
           <p>Hi! I am a nice modal :)</p><a className={style.btn} href="#close">OK</a>
       </div>
   )
}