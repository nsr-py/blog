import React from "react"

import footerStyles from "./component-styles/footer.module.scss";

export default function Footer({page, author}) {
  let displaySubscriptionForm = true;
  if( page === "Home" || page === "about" ){
    displaySubscriptionForm = false;
  }
  return(
    <footer className={footerStyles.footer}>
      <div className={displaySubscriptionForm?footerStyles.newsletter:footerStyles.hide}>
        <form
          action="https://tinyletter.com/nsrCodes"
          method="post" 
          target="popupwindow"
          onSubmit="window.open('https://tinyletter.com/nsrCodes', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <input 
            type="email" 
            name="email" 
            id="tlemail" 
            placeholder="Subscribe to NewsLetter"
            required/>
          <input type="hidden" value="1" name="embed"/>
          <input type="submit" value="Subscribe" id="button" />
        </form>
      </div>        
      <p>Made with love by {author}</p>
    </footer>
  )
}


// <form style="border:1px solid #ccc;padding:3px;text-align:center;" action="https://tinyletter.com/nsrCodes" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/nsrCodes', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
//   <p>
//     <label for="tlemail">
//       Enter your email address
//     </label>
//   </p>
//   <p>
//     <input type="text" style="width:140px" name="email" id="tlemail" />
//   </p>
//   <input type="hidden" value="1" name="embed"/>
//   <input type="submit" value="Subscribe" />
//   <p>
//     <a href="https://tinyletter.com" target="_blank">powered by TinyLetter</a>
//   </p>
// </form>
//         