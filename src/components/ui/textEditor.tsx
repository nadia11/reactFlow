import  { useState, useRef, useCallback, useEffect } from 'react';
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

const initialText = ``;

const TextEditor = () => {
  // Initialize editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(initialText))
  );
  const editorRef = useRef<Editor | null>(null);


  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);
  useEffect(() => {
    focusEditor();
  }, [focusEditor]);
  const handleChange = (newEditorState:EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command:string) => {
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
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          ref={editorRef}
        />
         <div className="editorStyles_toolbar">
        <Toolbar>
          {(externalProps) => (
            <div className='flex items-center justify-center'>
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
      {/* <div className="editorStyles_options">
        <EmojiSelect closeOnEmojiSelect />
      </div> */}
    </div>
  );
};

export default TextEditor;
