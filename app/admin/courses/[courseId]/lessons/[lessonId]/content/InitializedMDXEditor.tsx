'use client';
// InitializedMDXEditor.tsx
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  MDXEditor,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  linkPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorProps,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import styles from './mdx-editor-theme.module.css';

// Only import this to the next file
export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      contentEditableClassName="prose dark:prose-invert"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', jsx: 'JSX' },
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin(),
        linkPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === 'codeblock',
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === 'sandpack',
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
    />
  );
}