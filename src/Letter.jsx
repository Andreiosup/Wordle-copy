import "./Wordle.css"

export default function Node(props) {
    return (
      <div className={`node node-${props.row}`}>
        <div className="letter">{props.letter}</div>
      </div>
    );
}