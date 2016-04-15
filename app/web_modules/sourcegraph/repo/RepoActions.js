export class WantRepo {
	constructor(repo) {
		this.repo = repo;
	}
}

export class FetchedRepo {
	constructor(repo, repoObj) {
		this.repo = repo;
		this.repoObj = repoObj;
	}
}

export class RepoCloning {
	constructor(repo, isCloning) {
		this.repo = repo;
		this.isCloning = isCloning;
	}
}

export class WantResolveRepo {
	constructor(repo) {
		this.repo = repo;
	}
}

export class RepoResolved {
	constructor(repo, resolution) {
		this.repo = repo;
		this.resolution = resolution;
	}
}

export class WantCreateRepo {
	constructor(repo, remoteRepo) {
		this.repo = repo;
		this.remoteRepo = remoteRepo;
	}
}

export class RepoCreated {
	constructor(repo, repoObj) {
		this.repo = repo;
		this.repoObj = repoObj;
	}
}

export class WantBranches {
	constructor(repo) {
		this.repo = repo;
	}
}

export class FetchedBranches {
	constructor(repo, branches) {
		this.repo = repo;
		this.branches = branches;
	}
}

export class WantTags {
	constructor(repo) {
		this.repo = repo;
	}
}

export class FetchedTags {
	constructor(repo, tags) {
		this.repo = repo;
		this.tags = tags;
	}
}

export class RefreshVCS {
	constructor(repo) {
		this.repo = repo;
	}
}
