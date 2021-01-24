import styled from "styled-components";
export const ApiExplorerStyled = styled.div`
  background: linear-gradient(167deg, hsl(40deg 15% 95%) 10%, hsl(36deg 20% 90%) 50%, hsl(45deg 15% 85%) 87%);
  min-width: 1080px;
  position: relative;
  .content {
    // This is for both main page, and inside nav <li>s
    position: relative;
    padding-top: 1.125rem;
    padding-bottom: 1.25rem;
    h4 {
      font-size: 1.125rem;
      line-height: 2rem;
      margin: 0;
      font-weight: bold;
      svg {
        font-size: 0.85em;
        vertical-align: middle;
      }
    }
  }
  header {
    .ui_button {
      margin-right: -2px;
      margin-top: -0.2rem;
      float: right;
    }
  }
  article {
    display: flex;
    nav {
      ul,
      li {
        margin: 0;
        padding: 0;
        display: block;
        list-style: none;
      }
      li {
        &.active {
          background: white;
          box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
          margin-bottom: 0.5rem;
        }
        &:not(.active) {
          margin-bottom: -0.5rem;
          cursor: pointer;
        }
        .content {
          min-width: 18rem;
          margin-right: 1.5rem;
        }
        input {
          color: hsl(220deg 80% 60%);
        }
        button {
          background: hsl(220deg 80% 60%);
          &:hover {
            background: hsl(210deg 85% 65%);
          }
          &:focus {
            outline: none; // button is just for show
          }
        }
        .ui_fieldset {
          margin: 0.25rem 0 0.25rem -0.125rem;
        }
      }
    }
    main {
      flex-grow: 1;
      padding: 1.5rem 1rem 1.5rem 1.75rem;
      background: white;
      box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
      height: calc(100vh - 2.5rem);
      overflow: auto;
      font-size: 0.85rem;
      line-height: 1rem;
    }
  }
`;
