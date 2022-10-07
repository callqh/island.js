import type { MatchResultItem } from '../../logic/search';
import style from './index.module.scss';

export function SuggestionContent(props: {
  suggestion: MatchResultItem;
  query: string;
  isCurrent: boolean;
}) {
  const { suggestion, query } = props;
  const renderHeaderMatch = () => {
    if (suggestion.type === 'header') {
      const { header, headerHighlightIndex } = suggestion;
      const headerPrefix = header.slice(0, headerHighlightIndex);
      const headerSuffix = header.slice(headerHighlightIndex + query.length);
      return (
        <div font="medium">
          <span>{headerPrefix}</span>
          <span bg="brand-light" p="y-0.4 x-0.8" rounded="md" text="text-1">
            {query}
          </span>
          <span>{headerSuffix}</span>
        </div>
      );
    } else {
      return <div font="medium">{suggestion.header}</div>;
    }
  };
  const renderStatementMatch = () => {
    if (suggestion.type !== 'content') {
      return;
    }
    const { statementHighlightIndex, statement } = suggestion;
    const statementPrefix = statement.slice(0, statementHighlightIndex);
    const statementSuffix = statement.slice(
      statementHighlightIndex + query.length
    );
    return (
      <div font="normal" text="sm gray-light" w="100%">
        <span>{statementPrefix}</span>
        <span bg="brand-light" p="y-0.4 x-0.8" rounded="md" text="[#000]">
          {query}
        </span>
        <span>{statementSuffix}</span>
      </div>
    );
  };
  return (
    <div
      border-1=""
      table-cell=""
      p="x-3 y-2"
      className={`${style.suggestion} border-right-none ${
        props.isCurrent ? 'bg-[#f3f4f5]' : ''
      }`}
      transition="bg duration-200"
    >
      <div font="medium" text="sm">
        {renderHeaderMatch()}
      </div>
      {suggestion.type === 'content' && renderStatementMatch()}
    </div>
  );
}
