function Input(props) {
    const textarea = React.useRef(null);
    return (
        <div id="input-container" className={props.isActive ? "active" : ""}>
            <form id="input" autoFocus={true} onKeyDown={props.enterPost}>
                <textarea value={props.params.value.join("")} ref={props.textarea} rows={props.params.row} wrap="hard" onChange={props.update}></textarea>
                <input type="submit" value="送信" title="ctrl+Enter" onClick={props.addComment}></input>
            </form>
        </div>
    );
}
