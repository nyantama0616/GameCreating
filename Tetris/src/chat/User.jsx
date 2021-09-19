function User(props) {
    let style = props.pattern ? { left: 0 } : { right: 0 }
    return (
        <img src={props.img} title={props.name} style={style}></img>
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
                handleChange={props.handleChange}
                handleClick={props.handleClick}
                handleKeyDown={props.handleKeyDown}
            />
        </div>
    );
}

function Image(props) {
    return (
        <div className="image-container" onClick={() => props.handleClick(props.id)}>
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
                handleClick={props.handleClick}>
            </Image>
        );
    });
    
    return (
        <div id="image-select">
            {images}
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
            isActive: false
        }

        this.images = Array.from(Array(15), (_, i) => {
            return `../assets/img/chat/user/user${i}.png`;
        });

        this.handleNameSelect = this.handleNameSelect.bind(this);
        this.handleImageSelect = this.handleImageSelect.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.enterPost = this.enterPost.bind(this);
        this.handleClickWindow = this.handleClickWindow.bind(this);

        // refs
        this.textarea = React.createRef();
    }

    // ctrl+Enterでコメントを送信できる
    enterPost(e) {
        if (e.key === "Enter" && (e.crtlKey || e.metaKey)) {
            this.handleNameSelect(e);
        }
    }

    nameAlert() {
        alert("12文字以内で頼む。");
    }

    handleNameChange(e) {
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

        this.props.createUser(value[0], this.state.img, this.state.pattern);
        document.cookie = `name=${value[0]}`
        document.cookie = `img=${this.state.img}`
        document.cookie = `pattern=${this.state.pattern}`
    }
    
    activateInput(flag = true) {
        this.setState({
            isActive: flag
        });
    }

    handleClickWindow(e) {
        let target = e.target;
        if (target.className === "input-container" || target.parentNode.className === "input") {
            this.activateInput();
            this.textarea.current.focus();
        } else {
            this.activateInput(false);
        }
    }

    render() {
        if (this.props.user) return null;

        let select;
        switch (this.state.mode) {
            case 0:
                select = <ImageSelect
                    images={this.images}
                    handleClick={this.handleImageSelect}
                />
                break;
                case 1:
                select = <NameSelect
                        img={this.state.img}
                        params={this.state.nameInput}
                        textarea={this.textarea}
                        isActive={this.state.isActive}
                        handleChange={this.handleNameChange}
                        handleClick={this.handleNameSelect}
                        handleKeyDown={this.enterPost}
                    />
                break
        }

        return (
            <div id="user-select" onClick={this.handleClickWindow}>
                <h1>{this.state.guide}</h1>
                {select}
            </div>
        )
    }
}
