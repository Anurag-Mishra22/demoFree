import React from 'react';

interface Mark {
    type: string;
}

interface TextContent {
    type: 'text';
    text: string;
    marks?: Mark[];
}

interface ParagraphContent {
    type: 'paragraph';
    content: TextContent[];
}

interface ParagraphProps {
    content: any;
}

const Paragraph: React.FC<ParagraphProps> = ({ content }) => {
    return (
        <p>
            {content.map((item, index) => {
                if (item.marks && item.marks.some(mark => mark.type === 'bold')) {
                    return (
                        <strong key={index}>{item.text}</strong>
                    );
                } else {
                    return item.text;
                }
            })}
        </p>
    );
};

export default Paragraph;