// import React, { useState, useRef, useCallback } from 'react';
// import { EditorState, ContentState } from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
// import createEmojiPlugin from '@draft-js-plugins/emoji';
// import '@draft-js-plugins/emoji/lib/plugin.css';
// import './editorStyles.module.css'; // Your styles

// const emojiPlugin = createEmojiPlugin({
//   useNativeArt: true,
// });
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
// const plugins = [emojiPlugin];

// const initialText = `Type here`;

// const TextEditor = () => {
//   // Initialize editor state with text
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createWithContent(ContentState.createFromText(initialText))
//   );

//   const editorRef = useRef(null);

//   const focusEditor = useCallback(() => {
//     if (editorRef.current) {
//       editorRef.current.focus();
//     }
//   }, []);

//   const handleChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   return (
//     <div>
//       <div className="editorStyles_editor" onClick={focusEditor}>
//         <Editor
//           editorState={editorState}
//           onChange={handleChange}
//           plugins={plugins}
//           ref={editorRef}
//         />
//         <EmojiSuggestions />
//       </div>
//       <div className="editorStyles_options">
//         <EmojiSelect closeOnEmojiSelect />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
import React, { useState, useRef, useCallback } from 'react';
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
import './editorStyles.module.css'; // Your custom styles

// Initialize plugins
const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin, toolbarPlugin];

const initialText = `Type here`;

const TextEditor = () => {
  // Initialize editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(initialText))
  );

  const editorRef = useRef(null);

  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div>
      <div className="editorStyles_toolbar">
        <Toolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
            </>
          )}
        </Toolbar>
      </div>
      <div className="editorStyles_editor" onClick={focusEditor}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          ref={editorRef}
        />
        <EmojiSuggestions />
      </div>
      <div className="editorStyles_options">
        <EmojiSelect closeOnEmojiSelect />
      </div>
    </div>
  );
};

export default TextEditor;
