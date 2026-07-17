import {useEditor,EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import Toolbar from "./Toolbar";


const Editor = ({setBlogContent}) =>{

   const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4 mx-auto',
        },
      }),
    ],
    content: `
      <h2>Welcome 👋</h2>
      <p>Start writing your first blog...</p>
    `,
    shouldRerenderOnTransaction: true
    ,
    onUpdate: ({ editor }) => {
      editor.getHTML() && setBlogContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 
          'prose  max-w-none focus:outline-none min-h-[250px] p-4 text-gray-800  transition-all [&_ol]:list-decimal [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold',
      },
    },
  });

    if (!editor) return null;

    return(
      <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
      <Toolbar editor={editor} />
      
      <div className="overflow-y-auto max-h-125">
        <EditorContent editor= {editor} />
      </div>
    </div>
    )
}

export default Editor;