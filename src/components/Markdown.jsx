import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import React from 'react'

const Markdown = ({markdown, title}) => {
    // const markdown = `Just a link: https://reactjs.com.`;
    const syntaxTheme = vscDarkPlus;
  return (
    <div className="prose m-auto lg:border border-slate-50 lg:p-10 lg:rounded-lg lg:shadow-lg">
      <h1>{title}</h1>
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkSlug, remarkToc, remarkGfm]}
        // rehypePlugins={[[rehypeHighlight, {ignoreMissing: true}, rehypeRaw]]}
        rehypePlugins={[[rehypeRaw]]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={syntaxTheme}
                language={match[1]}
                PreTag="div"
                className="shl"
                // showLineNumbers={true}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown