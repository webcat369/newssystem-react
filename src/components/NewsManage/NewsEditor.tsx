import React,{useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props:any) {
  const [editorState,seteditorState] = useState("" as any)

  useEffect(() => {
    // html-===> draft
    const html = props.content
    // 排除新增新闻时没传content
    if(html === undefined) return
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      seteditorState(editorState)
    }
  },[props.content])

  return (
    <div>
      <Editor 
      editorState={editorState}
      toolbarClassName="aaaaa"
      wrapperClassName="bbbbb"
      editorClassName="ccccc"
      onEditorStateChange={(editorState)=>seteditorState(editorState)} //富文本获取值

      onBlur={()=>{
          // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))

          props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }}/>
    </div>
  )
}