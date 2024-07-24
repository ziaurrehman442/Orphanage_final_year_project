import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const Language = () => {
  const {i18n} = useTranslation();

  useEffect(() => {
    document.body.dir = "ltr";
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
      return (
    <div className="langbtn">
    <button className="btn btn-warning" type="button" id="btn" onClick={()=>{changeLanguage(i18n.language !== 'ar' ? "ar" : "en");}}>
    {i18n.language !== 'ar' ? "Arabic" : "English"}
    </button>
    {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><button className="dropdown-item" width="300px" onClick={()=>{changeLanguage(i18n.language !== 'ar' ? "ar" : "en");}}>{i18n.language !== 'ar' ? "Arabic" : "English"}</button></li>
    </ul> */}
  </div>
  )
}

export default Language;