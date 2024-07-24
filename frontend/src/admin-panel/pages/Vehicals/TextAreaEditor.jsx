import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import './textareaeditor.css'

const TextAreaEditor = ({ setData, value }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    
  useEffect(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [value]);
    
    const handleChange = (event) => {
        setEditorState(event)
        setData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

  return (
    <div>
        <Editor 
            editorStyle={{height: '15em'}}
            wrapperClassName="wrapper-textarea"
            editorClassName="editor"
            toolbarClassName="toolbar"
            editorState={editorState}
            onEditorStateChange={handleChange}
        />
    </div>
  )
}

export default TextAreaEditor