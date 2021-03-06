package search

import (
	"github.com/sourcegraph/sourcegraph/internal/api"
	"github.com/sourcegraph/sourcegraph/internal/endpoint"
	"github.com/sourcegraph/sourcegraph/internal/gitserver"
	searchbackend "github.com/sourcegraph/sourcegraph/internal/search/backend"
	"github.com/sourcegraph/sourcegraph/internal/search/query"
	"github.com/sourcegraph/sourcegraph/internal/vcs/git"
)

type TypeParameters interface {
	typeParametersValue()
}

func (c CommitParameters) typeParametersValue()  {}
func (d DiffParameters) typeParametersValue()    {}
func (s SymbolsParameters) typeParametersValue() {}
func (t TextParameters) typeParametersValue()    {}

type CommitParameters struct {
	RepoRevs           *RepositoryRevisions
	PatternInfo        *PatternInfo
	Query              *query.Query
	Diff               bool
	TextSearchOptions  git.TextSearchOptions
	ExtraMessageValues []string
}

type DiffParameters struct {
	Repo    gitserver.Repo
	Options git.RawLogDiffSearchOptions
}

type SymbolsParameters struct {
	// Repo is the name of the repository to search in.
	Repo api.RepoName `json:"repo"`

	// CommitID is the commit to search in.
	CommitID api.CommitID `json:"commitID"`

	// Query is the search query.
	Query string

	// IsRegExp if true will treat the Pattern as a regular expression.
	IsRegExp bool

	// IsCaseSensitive if false will ignore the case of query and file pattern
	// when finding matches.
	IsCaseSensitive bool

	// IncludePatterns is a list of regexes that symbol's file paths
	// need to match to get included in the result
	//
	// The patterns are ANDed together; a file's path must match all patterns
	// for it to be kept. That is also why it is a list (unlike the singular
	// ExcludePattern); it is not possible in general to construct a single
	// glob or Go regexp that represents multiple such patterns ANDed together.
	IncludePatterns []string

	// ExcludePattern is an optional regex that symbol's file paths
	// need to match to get included in the result
	ExcludePattern string

	// First indicates that only the first n symbols should be returned.
	First int
}

// TextParameters are the parameters passed to a search backend. It contains the Pattern
// to search for, as well as the hydrated list of repository revisions to
// search. It defines behavior for text search on repository names, file names, and file content.
type TextParameters struct {
	PatternInfo *PatternInfo
	Repos       []*RepositoryRevisions

	// Query is the parsed query from the user. You should be using Pattern
	// instead, but Query is useful for checking extra fields that are set and
	// ignored by Pattern, such as index:no
	Query *query.Query

	// UseFullDeadline indicates that the search should try do as much work as
	// it can within context.Deadline. If false the search should try and be
	// as fast as possible, even if a "slow" deadline is set.
	//
	// For example searcher will wait to full its archive cache for a
	// repository if this field is true. Another example is we set this field
	// to true if the user requests a specific timeout or maximum result size.
	UseFullDeadline bool

	Zoekt        *searchbackend.Zoekt
	SearcherURLs *endpoint.Map
}

// TextParametersForCommitParameters is an intermediate type based on
// TextParameters that encodes parameters exclusively for a commit search. The
// commit search internals converts this type to CommitParameters. The
// commitParameter type definitions will be merged in future.
type TextParametersForCommitParameters struct {
	PatternInfo *PatternInfo
	Repos       []*RepositoryRevisions
	Query       *query.Query
}
