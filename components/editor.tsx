"use client"

import Quill, { QuillOptions } from 'quill'

import "quill/dist/quill.snow.css"
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { ImageIcon, Smile } from 'lucide-react';
import { Delta, Op } from 'quill/core';
import IconPicker from './icon-picker';

type EditorValue = {
    image: File | null;
    body: string;
}

interface EditorProps {
    onSubmit?: ({ image, body }: EditorValue) => void
    onCancel?: () => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    variant?: 'create' | 'update';
}

const Editor = ({
    variant = "create",
    onSubmit,
    onCancel,
    placeholder = "Write something...",
    defaultValue = [],
    disabled = false,
    innerRef
}: EditorProps) => {

    const [text, setText] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef(onSubmit);
    const placeholderRef = useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    })


    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement('div')
        )

        const options: QuillOptions = {
            theme: 'snow',
            placeholder: placeholderRef.current,
        }

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quillRef.current?.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText())

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText())
        })



        return () => {
            quill.off(Quill.events.TEXT_CHANGE)
            if (container) {
                container.innerHTML = ''
            }
            if (quillRef.current) {
                quillRef.current = null;
            }
            if (innerRef) {
                innerRef.current = null;
            }
        }

    }, [innerRef])

    const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
    console.log(isEmpty)
    console.log(text)
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white'>
                <div ref={containerRef} className='h-full ql-custom' />
                <div className='flex px-2 pb-2 z-[5]'>
                    <Button
                        disabled={false}
                        size="icon"
                        variant="ghost"
                        onClick={() => { }}
                    >
                        <PiTextAa className='size-4' />
                    </Button>
                    <IconPicker asChild onChange={() => { }}>

                        <Button
                            disabled={false}
                            size="icon"
                            variant="ghost"
                            onClick={() => { }}
                        >
                            <Smile className='size-4' />
                        </Button>
                    </IconPicker>
                    {
                        variant === 'create' && (
                            <Button
                                disabled={false}
                                size="icon"
                                variant="ghost"
                                onClick={() => { }}
                            >
                                <ImageIcon className='size-4' />
                            </Button>
                        )
                    }
                    {
                        variant === 'update' && (
                            <div className='ml-auto flex items-center gap-x-2'>
                                <Button variant="outline" size="sm" onClick={() => { }} disabled={false}>
                                    Cancel
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => { }} disabled={false}
                                    className=' bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
                                >
                                    Save
                                </Button>
                            </div>
                        )
                    }
                    {
                        variant === 'create' && (
                            <Button disabled={disabled || isEmpty} onClick={() => { }} size="icon" className='ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'>
                                <MdSend className='size-4' />
                            </Button>
                        )
                    }
                </div>
            </div>
            <div className='p-2 text-[10px] text-muted-foreground flex justify-end'>
                <p>
                    <strong>Shift + Return</strong> to add a new line
                </p>
            </div>
        </div>
    )
}

export default Editor