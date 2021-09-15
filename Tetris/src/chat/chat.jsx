import React from "react";
import ReactDOM from "react-dom";

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            input: {
                value: [""],
                row: 1,
            },
            isActive: false
        }

        this.usedID = {};
        this.updateInput = this.updateInput.bind(this);
        this.addComment = this.addComment.bind(this);
        this.enterPost = this.enterPost.bind(this);

        // refs
        this.textarea = React.createRef();
        this.commentsBottom = React.createRef();
    }

    generateID() {
        let result;
        {
            result = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        } while (this.usedID[result]);
        this.usedID[result] = true;
        return result;
    }

    // 空白だけとかのコメントは送れらん
    static validation(value) {
        let str = value.join("");
        let judge = str.length > 0 && str.match(/[^ 　\n\t]/)
        return judge;
    }

    static generateComment(value, id) {
        let img = `url(../assets/img/chat/cloud${Mylib.rand(0, 5)}.png)`;

        // コメントのサイズを決める
        let width = 0;
        let height;
        value.forEach(str => {
            width = Math.max(width, Mylib.charCount(str));
        });
        width *= 20;
        width = Math.max(width, 100);
        width = Math.min(width, 380);
        height = width * (100 / 280) * (value.length / 3) * 1.5;
        height = Math.max(height, 70);
        //
        
        let marginLeft = `${Mylib.rand(-60, 200)}px`;
        let style = {
            width: `${width}px`,
            height: `${height}px`,
            marginLeft: marginLeft,
            backgroundSize: `${width}px ${height}px`,
            backgroundImage: img
        }



        return <Comment key={id} value={value} style={style}/>
    }

    // cmd+Enterでコメントを送信できる
    enterPost(e) {
        if (e.key === "Enter" && (e.crtlKey || e.metaKey)) {
            this.addComment(e);
        }
    }

    // コメント追加
    addComment(e) {
        e.preventDefault();
        let value = this.state.input.value;
        let id = this.generateID();
        if (!Chat.validation(value)) return;
        let comment = Chat.generateComment(value, id);
        let comments = this.state.comments
        comments.push(comment);
        this.setState({
            comments: comments,
            input: {
                value: [""],
                row: 1
            }
        });

        // 自動で下までスクロール
        this.commentsBottom.current.scrollIntoView();
    }

    // スパゲティ
    updateInput(e) {
        let row = this.state.input.row;
        let value = Mylib.split(e.target.value, "\n");
        value[row - 1] ||= ""
        let isAdded = value[row - 1].length > this.state.input.value[row - 1].length;

        if (isAdded && e.target.value.slice(-1) === "\n") {
            if (row === 3) return;
            value.push("");
            row++;
        } else if (Mylib.charCount(value[row - 1]) > 30) { //ここで一行あたりの文字数制限
            if (row === 3) return;
            
            let target = value[row - 1].split("");
            let temp = target.slice(-1);
            target[target.length - 1] = "\n";
            value[row - 1] = target.join("");
            value.push(temp);
            row++;
        } else if (row > 1 && !isAdded && !value[row - 1] && value[row - 2].slice(-1) !== "\n") {
            value.pop();
            row--;
        } 

        this.setState({
            input: {
                value: value,
                row: row
            }
        });
    }

    activateInput(flag = true) {
        this.setState({
            isActive: flag
        });
    }

    render() {
        return (
            <div id="chat" onClick={(e) => {
                let target = e.target;
                if (target.id === "input-container" || target.parentNode.id === "input") {
                    this.activateInput();
                    this.textarea.current.focus();
                } else {
                    this.activateInput(false);
                }
            }}>
                <div id="chat-space">
                    <div id="comments-container">
                        <ul>
                            {this.state.comments}
                        </ul>
                        <div ref={this.commentsBottom }id="comments-bottom"></div>
                    </div>
                    <Input
                        textarea={this.textarea}
                        params={this.state.input}
                        isActive={this.state.isActive}
                        update={this.updateInput}
                        addComment={this.addComment}
                        enterPost={this.enterPost}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>,
    document.getElementById('root')
);
