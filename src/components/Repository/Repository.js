import React, { useState, useEffect } from 'react';
import moment from 'moment';

import * as RepositoryService from '../../services/RepositoryService';

import './Repository.css';

const renderRepos = (repos) => {
  if (repos && Array.isArray(repos) && repos.length > 0) {
    return repos.map((repo) => {
      const { name, updated_at, id, svn_url, language } = repo;
      return (
        <div className="repo" key={id}>
          <div className="topRow">
            <a href={svn_url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
            <button type="button">Star</button>
          </div>
          <span>{language}</span>&nbsp;
          <span>Updated on {moment(updated_at).format('DD MMM YYYY')}</span>
        </div>
      );
    });
  }
  return <span className="noData">No repositories found</span>;
};

const Repository = () => {
  const [repos, setRepos] = useState([]);

  const getRepositories = async () => {
    const { response, error } = await RepositoryService.getRepositories();
    if (!error) {
      setRepos(response);
    } else {
      //show error
      alert('Error fetching repositories');
    }
  };

  useEffect(() => {
    getRepositories();
  }, []);

  //this method needs to be debounced to avoid mutliple triggers in short duration
  const onRepoSearch = (e) => {
    const repoclone = repos.slice(0);
    e.stopPropagation();
    e.preventDefault();
    const query = e?.target?.value;
    console.log('query', query);
    //ideally this should be server side search, for simplicity adding client side search
    if (query) {
      const matchedRepos = repoclone.filter((repo) =>
        repo.name.toLowerCase().includes(query.toLowerCase())
      );
      setRepos(matchedRepos);
    } else {
      getRepositories();
    }
  };

  return (
    <div className="main">
      <input
        className="bp3-input search"
        type="text"
        placeholder="Find a repository..."
        onChange={onRepoSearch}
      />
      {renderRepos(repos)}
    </div>
  );
};

export default Repository;
