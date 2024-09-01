import React from "react";

type RenderContentProps = {
    descJson: string;
};

export const RenderContent = ({ descJson }: RenderContentProps) => {
    let content: any[] = [];

    try {
        const parsedData = JSON.parse(descJson);
        content = parsedData?.content || [];
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return <p className="text-red-500 p-3 bg-red-50 border border-red-200 rounded-md text-sm">Error parsing content.</p>;
    }

    const renderList = (list: any[], isOrdered: boolean) => {
        const ListTag = isOrdered ? 'ol' : 'ul';
        return (
            <ListTag className={`${isOrdered ? 'list-decimal' : 'list-disc'} list-outside pl-5 my-3 space-y-2`}>
                {list?.map((listItem: any, idx: number) => (
                    <li key={idx} className="text-gray-700 text-sm leading-relaxed">
                        {listItem?.content?.map((contentItem: any, id: number) => (
                            <React.Fragment key={id}>
                                {contentItem.type === 'paragraph' && contentItem?.content?.map((textItem: any, tid: number) => (
                                    <React.Fragment key={tid}>
                                        {textItem.type === 'text' && (
                                            <span className={textItem.marks && textItem.marks.some((mark: any) => mark.type === 'bold') ? 'font-medium' : ''}>
                                                {textItem.text}
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                                {contentItem.type === 'bulletList' && renderList(contentItem.content, false)}
                                {contentItem.type === 'orderedList' && renderList(contentItem.content, true)}
                            </React.Fragment>
                        ))}
                    </li>
                ))}
            </ListTag>
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white">
            {content?.map((item: any, index: number) => {
                if (item.type === 'heading') {
                    const headingClasses = {
                        1: 'text-3xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200',
                        2: 'text-2xl font-semibold text-gray-700 mt-6 mb-3',
                        3: 'text-xl font-medium text-gray-600 mt-4 mb-2'
                    };
                    const HeadingTag = `h${item.attrs.level}` as keyof JSX.IntrinsicElements;
                    return (
                        <HeadingTag key={index} className={headingClasses[item.attrs.level as keyof typeof headingClasses]}>
                            {item?.content?.map((textItem: any, idx: number) => (
                                <span key={idx}>{textItem.text}</span>
                            ))}
                        </HeadingTag>
                    );
                } else if (item.type === 'paragraph') {
                    return (
                        <p key={index} className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {item.content.map((textItem: any, idx: number) =>
                                textItem.marks && textItem.marks.some((mark: any) => mark.type === 'bold') ? (
                                    <strong key={idx} className="font-medium text-gray-800">{textItem.text}</strong>
                                ) : (
                                    <span key={idx}>{textItem.text}</span>
                                )
                            )}
                        </p>
                    );
                } else if (item.type === 'bulletList') {
                    return (
                        <React.Fragment key={index}>
                            {renderList(item.content, false)}
                        </React.Fragment>
                    );
                } else if (item.type === 'orderedList') {
                    return (
                        <React.Fragment key={index}>
                            {renderList(item.content, true)}
                        </React.Fragment>
                    );
                } else if (item.type === 'codeBlock') {
                    return (
                        <div key={index} className="mb-4 rounded-md overflow-hidden border border-gray-200">
                            <div className="bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600">Code</div>
                            <pre className="bg-gray-50 p-4 overflow-x-auto">
                                <code className="text-sm text-gray-800 font-mono">
                                    {item.content.map((textItem: any, idx: number) => (
                                        <span key={idx}>{textItem.text}</span>
                                    ))}
                                </code>
                            </pre>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};