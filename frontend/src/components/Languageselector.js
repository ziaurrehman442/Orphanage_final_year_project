import React from "react";

const languages = [
    {code: "en", lang: "English"},
    {code: "ar", lang: "Arabic"}
]

i18next.changelanguage()

function LanguageSelectors(){
    return <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Select Language
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    {languages.map((lng)=>{
      return <li><button className="dropdown-item" key={lng.code} onClick={()=>changelanguage(lng.code)}>{lng.lang}</button></li>
    })}
  </ul>
</div>
}

export default LanguageSelectors;