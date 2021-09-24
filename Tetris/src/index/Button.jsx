function Button(props) {
    return (
        <div className="btn">
            <button onClick={props.onClick}><a href={props.href}>{props.value}</a></button>
        </div>
    );
}
