class Chat extends React.Component {
    constructor() {
        super();

        this.usedCommentID = {};
        
        this.state = {
            comments: [],
            input: {
                value: [""],
                row: 1
            },
            isActive: false,
            user: false
        }

        this.createUser = this.createUser.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.addComment = this.addComment.bind(this);
        this.enterPost = this.enterPost.bind(this);
        this.handleClickWindow = this.handleClickWindow.bind(this);

        // refs
        this.textarea = React.createRef();
        this.commentsBottom = React.createRef();
    }

    createUser(name, img, pattern, keyWord) {
        if (this.state.user) return;
        Manager.socket.emit("createUserRequest");
        Manager.socket.on("createUserResponse", data => {
            let user = {
                id: data.users[data.id].id,
                img: img,
                name: name,
                pattern: pattern,
                keyWord: keyWord
            }

            Manager.createUser(user);

            this.setState({
                user: true
            });
        });
    }

    // 空白だけとかのコメントは送れらん
    static validation(value) {
        let str = value.join("");
        let judge = str.length > 0 && str.match(/[^ 　\n\t]/)
        return judge;
    }

    static generateComment(value, id, user) {
        let img = `url(../assets/img/chat/cloud/cloud${Mylib.rand(0, 5)}.png)`;

        // コメントのサイズを決める
        let width = 0;
        let height;
        value.forEach(str => {
            width = Math.max(width, Mylib.charCount(str));
        });
        width *= 20;
        width = Math.max(width, 120);
        width = Math.min(width, 380);
        height = width * (100 / 280) * (value.length / 3) * 1.5;
        height = Math.max(height, 100);
        //

        let marginLeft = `${Mylib.rand(-60, 200)}px`;
        let style = {
            width: `${width}px`,
            height: `${height}px`,
            marginLeft: marginLeft,
            backgroundSize: `${width}px ${height}px`,
            backgroundImage: img
        }

        return <Comment key={id} value={value} style={style} user={user}/>
    }

    // ctrl+Enterでコメントを送信できる
    enterPost(e) {
        if (e.key === "Enter" && (e.crtlKey || e.metaKey)) {
            this.addComment(e);
        }
    }

    // "addCommentRequest"イベントで渡す関数
    refrectComment(data) {
        let value = data.value;
        let id = Mylib.generateID(this.usedCommentID);
        let userParams = data.user;
        let user = <User id={userParams.id} img={userParams.img} name={userParams.name} pattern={userParams.pattern}/>
        let comment = Chat.generateComment(value, id, user);
        let comments = this.state.comments
        comments.push(comment);

        this.setState({
            comments: comments
        });

        // 自動で下までスクロール
        if (this.state.isActive) this.commentsBottom.current.scrollIntoView();
    }

    // コメント追加
    addComment(e) {
        e.preventDefault();
        let value = this.state.input.value;
        if (!Chat.validation(value)) return;
        Manager.socket.emit("addCommentRequest", {
            value: value,
            user: Manager.getUser()
        });

        this.setState({
            input: {
                value: [""],
                row: 1,
            }
        });
    }

    // コメント入力欄の値を更新する（スパゲティ)
    updateInput(e) {
        let value = Mylib.split(e.target.value, "\n");
        value[0] ||= "";
        let v_len = value.length;
        let target = value[v_len - 1];
        let t_len = target.length;
        let isAdded = e.target.value.length > this.state.input.value.join("").length
        if (Mylib.charCount(target) > 30) {
            let temp = target[t_len - 1];
            if (temp === "\n") temp = "";
            value[v_len - 1] = value[v_len - 1].slice(0, -1) + "\n";
            value.push(temp);
        }
        let row = v_len;
        if (row > 3 || isAdded && row === 3 && value[2].slice(-1) === "\n") return;
        if (value[row - 1].slice(-1) === "\n") {
            if (isAdded) {
                row++;
            } else {
                value.pop();
                row--;
            }
        }
        this.setState({
            input: {
                value: value,
                row: row
            }
        })
    }

    activateInput(flag = true) {
        this.setState({
            isActive: flag
        });
    }

    handleClickWindow(e) {
        let target = e.target;
        if (this.state.user && (target.className === "input-container" || target.parentNode.className === "input")) {
            this.activateInput();
            this.textarea.current.focus();
        } else {
            this.activateInput(false);
        }
    }

    componentDidMount() {
        if (Manager.createUser()) {
            this.setState({
                user: true
            })
        }
        Manager.socket.on("addCommentResponse", data => { this.refrectComment(data) });
    }

    render() {
        return (
            <div id="chat" onClick={this.handleClickWindow}>
                <UserSelect user={this.state.user} createUser={this.createUser}/>
                <div id="chat-space" style={{ pointerEvents: this.state.user ? "all" : "none" }}> {/*ユーザーが設定されるまでは、クリックできない*/}
                    <div id="comments-container">
                        <ul>
                            {this.state.comments}
                        </ul>
                        <div ref={this.commentsBottom }id="comments-bottom"></div>
                    </div>
                    <Input
                        params={this.state.input}
                        textarea={this.textarea}
                        isActive={this.state.isActive}
                        onChange={this.updateInput}
                        onClick={this.addComment}
                        onKeyDown={this.enterPost}
                        buttonValue="送信"
                    />
                    {this.state.user ? null : <div id="chat-mask"></div>} {/*マスク*/}
                </div>
            </div>
        );
    }
}
