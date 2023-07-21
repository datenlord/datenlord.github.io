import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  :root {
    font-family: sans-serif;
    font-family: PingFang SC, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-size: 100px;

    color: black;
    background-color: white;

    box-sizing: border-box;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    @media screen and (max-width: 1399px) {
      font-size: 85px;
    }
    @media screen and (max-width: 1023px) {
      font-size: 70px;
    }
    @media screen and (max-width: 767px) {
      font-size: 55px;
    }
    @media screen and (max-width: 424px) {
      font-size: 40px;
    }

  }
  p {
    margin-block: 0;
  }
  ul, ol {
    margin-block: 0;
    padding-inline-start: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-block: 0;
  }
  a {
    text-decoration: none;
  }
  @keyframes opac {
  from {
      opacity: 1;
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
  }

  to {
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
  }
}

.content {
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 0.28rem;
    h1 {
      margin-block: 0.48rem;
      font-weight: 700;
      font-size: 0.36rem;
      line-height: 0.52rem;
    }
    h2 {
      margin-block: 0.48rem;
      font-weight: 700;
      font-size: 0.28rem;
      line-height: 0.44rem;
    }
    h3 {
      margin-block: 0.4rem;
      font-weight: 700;
      font-size: 0.24rem;
      line-height: 0.36rem;
    }
    h4 {
      margin-block: 0.32rem;
      font-weight: 700;
      font-size: 0.24rem;
      line-height: 0.32rem;
    }
    h5 {
      margin-block: 0.32rem;
      font-weight: 700;
      font-size: 0.22rem;
      line-height: 0.28rem;
    }
    h6 {
      margin-block: 0.24rem;
      font-weight: 700;
      font-size: 0.2rem;
      line-height: 0.24rem;
    }
    p {
      margin-block: 0.32rem;
      font-weight: 400;
      font-size: 0.18rem;
      line-height: 0.28rem;
    }
    a {
      display: inline;
      text-decoration: underline;
      color: #0052D9;
    }
    img {
      margin-block: 0.64rem;
      display: block;
      margin-inline: auto;
      max-width: 80%;
      /* max-height: 7.2rem; */
      border-radius: 0.08rem;
    }
    ol, ul {
      margin-block: 0.16rem;
      padding-inline-start: 20px;
    }
    blockquote {
      margin-block: 0.32rem;
      margin-inline: 0;
      padding-left: 10px;
      color: #8c8c8c;
      border-left: 4px solid #8c8c8c
    }
    hr {
      margin-block: 0.48rem;
    }
    pre {
      padding: 12px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow-x: scroll;
      code {
        padding: 0;
      }
    }
    code {
    padding: 4px;
    border-radius: 4px;
    background: #f0f0f0;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .hljs-comment,
    .hljs-quote {
      color: #998;
      font-style: italic;
    }
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-subst {
      color: #333;
      font-weight: 700;
    }
    .hljs-literal,
    .hljs-number,
    .hljs-tag .hljs-attr,
    .hljs-template-variable,
    .hljs-variable {
      color: teal;
    }
    .hljs-doctag,
    .hljs-string {
      color: #d14;
    }
    .hljs-section,
    .hljs-selector-id,
    .hljs-title {
      color: #900;
      font-weight: 700;
    }
    .hljs-subst {
      font-weight: 400;
    }
    .hljs-class .hljs-title,
    .hljs-type {
      color: #458;
      font-weight: 700;
    }
    .hljs-attribute,
    .hljs-name,
    .hljs-tag {
      color: navy;
      font-weight: 400;
    }
    .hljs-link,
    .hljs-regexp {
      color: #009926;
    }
    .hljs-bullet,
    .hljs-symbol {
      color: #990073;
    }
    .hljs-built_in,
    .hljs-builtin-name {
      color: #0086b3;
    }
    .hljs-meta {
      color: #999;
      font-weight: 700;
    }
    .hljs-deletion {
      background: #fdd;
    }
    .hljs-addition {
      background: #dfd;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
`
