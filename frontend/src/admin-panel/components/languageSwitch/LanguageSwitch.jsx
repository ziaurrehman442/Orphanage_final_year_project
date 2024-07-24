import React from 'react'

const LanguageSwitch = ({ onChangeLanguage }) => {
  return (
    <div>
      <button className='language-switcher' onClick={() => onChangeLanguage('en')}>English</button>
      <button className='language-switcher' onClick={() => onChangeLanguage('ar')}>العربية</button>
    </div>
  )
}

export default LanguageSwitch