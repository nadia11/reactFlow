import { EditorState, RichUtils } from 'draft-js';
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

const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin, toolbarPlugin];

interface TextEditorProps {
  value: EditorState;
  onChange: (value: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(value, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div>
      <div className="editorStyles_editor">
        <Editor
          editorState={value}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
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
