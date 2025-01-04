// import { EditorState, RichUtils } from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
// import createEmojiPlugin from '@draft-js-plugins/emoji';
// import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
// import {
//   BoldButton,
//   ItalicButton,
//   UnderlineButton,
//   CodeButton,
// } from '@draft-js-plugins/buttons';
// import '@draft-js-plugins/emoji/lib/plugin.css';
// import '@draft-js-plugins/static-toolbar/lib/plugin.css';
// import './editorStyles.module.css';

// const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
// const toolbarPlugin = createToolbarPlugin();
// const { Toolbar } = toolbarPlugin;
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
// const plugins = [emojiPlugin, toolbarPlugin];

// interface TextEditorProps {
//   value: EditorState;
//   onChange: (value: EditorState) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
//   const handleKeyCommand = (command: string) => {
//     const newState = RichUtils.handleKeyCommand(value, command);
//     if (newState) {
//       onChange(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   return (
//     <div>
//       <div className="editorStyles_editor">
//         <Editor
//           editorState={value}
//           onChange={onChange}
//           handleKeyCommand={handleKeyCommand}
//           plugins={plugins}
//         />
//         <div className="editorStyles_toolbar">
//           <Toolbar>
//             {(externalProps) => (
//               <div className="flex items-center justify-center">
//                 <BoldButton {...externalProps} />
//                 <ItalicButton {...externalProps} />
//                 <UnderlineButton {...externalProps} />
//                 <CodeButton {...externalProps} />
//                 <EmojiSelect closeOnEmojiSelect />
//               </div>
//             )}
//           </Toolbar>
//         </div>
//         <EmojiSuggestions />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState, ContentState, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  CodeButton,
} from '@draft-js-plugins/buttons';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './editorStyles.module.css';

// Initialize plugins
const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin, toolbarPlugin];

interface TextEditorProps {
  value: string; // Parent-provided plain text
  onChange: (value: string) => void; // Callback to update parent state
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  // Initialize editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(value || ''))
  );

  const editorRef = useRef<Editor | null>(null);

  // Focus the editor on mount
  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  useEffect(() => {
    focusEditor();
  }, [focusEditor]);

  // Update editor state and parent state on change
  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const plainText = newEditorState.getCurrentContent().getPlainText();
    onChange(plainText); // Pass plain text to the parent
  };

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div>
      <div className="editorStyles_editor" onClick={focusEditor}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          ref={editorRef}
        />
        <div className="editorStyles_toolbar">
          <Toolbar>
            {(externalProps) => (
              <div className="flex items-center justify-center">
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <EmojiSelect closeOnEmojiSelect />
              </div>
            )}
          </Toolbar>
        </div>
        <EmojiSuggestions />
      </div>
    </div>
  );
};

export default TextEditor;
