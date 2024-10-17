import Add from "./Add";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import House from "./House";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreading";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import TodoList from "./todos/TodoLists";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";

export default function Lab3() {
    return (
        <div>
            <h2>Lab 3</h2>
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInline />
            <LegacyFunctions />
            <ArrowFunctions />
            <ImpliedReturn />
            <TemplateLiterals />
            <SimpleArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingToFromArrays />
            <ForLoops />
            <MapFunction />
            <FindFunction />
            <FindIndex />
            <FilterFunction />
            <JsonStringify />
            <House />
            <TodoList />
            <Spreading />
            <Destructing />
            <FunctionDestructing />
            <DestructingImports />
            <Classes />
            <Styles />
            <Add a={2} b={3} />
            <h4>Square of 4</h4>
            Square of 4 = <Square>4</Square>
            <br />
            Square of 8 = <Square>8</Square>
            <hr />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <PathParameters />
            <br />
            <br />



        </div>
    );
}