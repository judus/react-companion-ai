import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import hljs from 'highlight.js';
import 'highlight.js/styles/obsidian.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'; // style

hljs.configure({languages: ['javascript', 'ruby', 'python', 'php', 'java']}); // languages

const Markdown = ({children}) => (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {children}
    </ReactMarkdown>
);

export default Markdown;