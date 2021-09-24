function User(props) {
    let style = props.pattern ? { left: 0 } : { right: 0 }
    return (
        <img src={props.img} title={props.name} style={style}></img>
    );
}

function Image(props) {
    return (
        <div className="image-container" onClick={() => props.onClick(props.id)}>
            <img src={props.images[props.id]} />
        </div>
    )
}

function ImageSelect(props) {
    let images = props.images.map((_, i) => {
        return (
            <Image key={i}
                id={i}
                images={props.images}
                onClick={props.onClick}>
            </Image>
        );
    });

    return (
        <div id="image-select">
            {images}
        </div>
    );
}

function NameSelect(props) {
    return (
        <div id="name-select">
            <img src={props.img} alt="user-image" />
            <Input
                params={props.params}
                textarea={props.textarea}
                isActive={props.isActive}
                buttonValue="決定"
                onChange={props.onChange}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
            />
        </div>
    );
}

function KeyWordSelect(props) {
    return (
        <div id="keyword-select">
            <h1>???</h1>
            <Input
                params={props.params}
                textarea={props.textarea}
                placeholder={props.placeholder}
                isActive={props.isActive}
                buttonValue="決定"
                onChange={props.onChange}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
            />
        </div>
    );
}

class UserSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            guide: "キャラクターをえらんでね!",
            img: null,
            pattern: null,
            nameInput: {
                value: [""],
                row: 1
            },
            keyWordInput: {
                value: [""],
                row: 1
            },
            nameIsActive: false,
            keyWordIsActive: false,
        }

        this.images = Array.from(Array(15), (_, i) => {
            return `../assets/img/chat/user/user${i}.png`;
        });

        this.handleImageSelect = this.handleImageSelect.bind(this);
        this.handleUpdateNameInput = this.handleUpdateNameInput.bind(this);
        this.handleNameSelect = this.handleNameSelect.bind(this);
        this.handleUpdateKeyWordInput = this.handleUpdateKeyWordInput.bind(this);
        this.handleKeyWordSelect = this.handleKeyWordSelect.bind(this);
        this.enterNamePost = this.enterNamePost.bind(this);
        this.enterKeyWordPost = this.enterKeyWordPost.bind(this);
        this.handleClickWindow = this.handleClickWindow.bind(this);

        // refs
        this.nameTextarea = React.createRef();
        this.keyWordTextarea = React.createRef();
    }

    // ctrl+Enterで名前を決定できる
    enterNamePost(e) {
        if (e.key === "Enter" && (e.crtlKey || e.metaKey)) {
            this.handleNameSelect(e);
        }
    }
    
    enterKeyWordPost(e) {
        if (e.key === "Enter" && (e.crtlKey || e.metaKey)) {
            this.handleKeyWordSelect(e);
        }
    }

    handleImageSelect(id) {
        let img = this.images[id];
        let pattern = id > 7;
        this.setState({
            img: img,
            pattern: pattern,
            mode: 1,
            guide: "なまえをきめてね!!"
        });
    }

    nameAlert() {
        alert("12文字以内で頼む。");
    }

    handleUpdateNameInput(e) {
        let value = e.target.value;
        if (value.slice(-1) === "\n") return;
        if (value.length > 12) {
            this.nameAlert();
            return;
        }
    
        this.setState({
            nameInput: {
                value: [value],
                row: 1
            }
        })
    }
    

    static validation(value) {
        let str = value.join("");
        let judge = str.length > 0 && str.match(/[^ 　\n\t]/)
        return judge;
    }

    handleNameSelect(e) {
        e.preventDefault();
        let value = this.state.nameInput.value;

        // バリデーション
        if (!Chat.validation(value)) return;

        this.setState({
            mode: 2,
            guide: "あいことばをいれてね!!"
        });
    }

    handleUpdateKeyWordInput(e) {
        let value = e.target.value;
        if (value.slice(-1) === "\n") return;
        if (value.length > 12) {
            this.nameAlert();
            return;
        }

        this.setState({
            keyWordInput: {
                value: [value],
                row: 1
            }
        });
    }

    handleKeyWordSelect(e) {
        e.preventDefault();
        this.end();
    }
    
    end() {
        let keyWord = this.state.keyWordInput.value[0] || "general";
        this.props.createUser(this.state.nameInput.value[0], this.state.img, this.state.pattern, keyWord);
    }

    
    activateNameInput(flag = true) {
        this.setState({
            nameIsActive: flag
        });
    }
    
    activateKeyWordInput(flag = true) {
        this.setState({
            keyWordIsActive: flag
        });
    }

    handleClickWindow(e) {
        let target = e.target;
        if (target.className === "input-container" || target.parentNode.className === "input") {
            this.activateNameInput();
            this.activateKeyWordInput();
            let current = this.nameTextarea.current || this.keyWordTextarea.current;
            current.focus();
        } else {
            this.activateNameInput(false);
            this.activateKeyWordInput(false);
        }
    }

    render() {
        if (this.props.user) return null;

        let select;
        switch (this.state.mode) {
            case 0:
                select = <ImageSelect
                    images={this.images}
                    onClick={this.handleImageSelect}
                />
                break;
            case 1:
                select = <NameSelect
                        img={this.state.img}
                        params={this.state.nameInput}
                        textarea={this.nameTextarea}
                        isActive={this.state.nameIsActive}
                        onChange={this.handleUpdateNameInput}
                        onClick={this.handleNameSelect}
                        onKeyDown={this.enterNamePost}
                />
                break
            case 2: {
                select = <KeyWordSelect
                    params={this.state.keyWordInput}
                    textarea={this.keyWordTextarea}
                    placeholder="何も入力しなくてもおｋ"
                    isActive={this.state.keyWordIsActive}
                    onChange={this.handleUpdateKeyWordInput}
                    onClick={this.handleKeyWordSelect}
                    onKeyDown={this.enterKeyWordPost}
                />
            }
        }

        return (
            <div id="user-select" onClick={this.handleClickWindow}>
                <h1>{this.state.guide}</h1>
                {select}
            </div>
        )
    }
}
