function Comment(props) {
    return (
        <div className="comment" style={props.style}>
            <li>
                {props.value.map((line, i) => <p key={i}>{line}</p>)}
            </li>
            {props.user}
        </div>
    );
}
