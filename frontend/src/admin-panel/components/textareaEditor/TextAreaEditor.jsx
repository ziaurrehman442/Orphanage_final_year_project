import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import './textareaeditor.css'

const TextAreaEditor = ({ setData }) => {
    const [editorData, setEditorData] = useState(EditorState.createEmpty());
    
    const handleChange = (event) => {
        setEditorData(event)
        setData(draftToHtml(convertToRaw(editorData.getCurrentContent())));
    }

  return (
    <div>
        <Editor 
            editorStyle={{height: '15em'}}
            wrapperClassName="wrapper-textarea"
            editorClassName="editor"
            toolbarClassName="toolbar"
            onEditorStateChange={handleChange}
        />
    </div>
  )
}

export default TextAreaEditor