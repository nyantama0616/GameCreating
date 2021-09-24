class Index extends React.Component {

    constructor() {
        super()
        this.handleClickMultiButton = this.handleClickMultiButton.bind(this);
    }

    handleClickMultiButton(e) {
        let user = {
            id: 5,
            name: "panda", 
            hp: 100
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("multiButton");
    }

    render() {
        return (  
            <div id="index">
                <Button href="multi" value="マルチ" onClick={this.handleClickMultiButton}/>
            </div>
        );
    }
}
