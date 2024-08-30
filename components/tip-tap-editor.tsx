"use client"
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import TipTapMenuBar from "./tip-tap-menubar";
import { Button } from "./ui/button";
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useDebounce } from "@/lib/useDebounce";
import useFileData from "@/hooks/tip-tap-data";
import useFileDataJson from "@/hooks/tip-tap-data-json";



const TipTapEdiotor = () => {
    const descString = useFileData((state) => state.setFileItem)
    const descStringJson = useFileDataJson((state) => state.setFileItem)

    const [editorState, setEditorState] = useState(
        // note.editorState || `<h1>${note.name}</h1>`
        ''
    );
    const debouncedEditorState = useDebounce(editorState, 500);
    useEffect(() => {
        // save to db
        if (debouncedEditorState === "") return;
        console.log("debouncedEditorState", debouncedEditorState);
        // saveNote.mutate(undefined, {
        //   onSuccess: (data) => {
        //     console.log("success update!", data);
        //   },
        //   onError: (err) => {
        //     console.error(err);
        //   },
        // });
    }, [debouncedEditorState]);

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit,
            Document,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2, 3],
            }),
        ],
        content: editorState,
        onUpdate: ({ editor }) => {
            // setEditorState(editor.getHTML());
            // console.log(JSON.stringify(editor.getJSON()));
            descStringJson(editor.getJSON());
            descString(editor.getText());

        },
    });
    // useEffect(() => {
    //     console.log(editorState);
    // }, [editorState])

    return (
        <>
            <div className="flex">
                {editor && <TipTapMenuBar editor={editor} />}

                <Button>Saved</Button>
            </div>

            <div className="prose">
                <EditorContent editor={editor} />
            </div>
        </>

    )
}

export default TipTapEdiotor