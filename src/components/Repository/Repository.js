import React, { useState, useEffect } from 'react';
import moment from 'moment';

import * as RepositoryService from '../../services/RepositoryService';

import './Repository.css';

const renderRepos = (repos) => {
  if (repos && Array.isArray(repos) && repos.length > 0) {
    return repos.map((repo) => {
      const { name, updated_at, id, git_url, language } = repo;
      return (
        <div className="repo" key={id}>
          <div className="topRow">
            <a href={git_url}>{name}</a>
            <button type="button">Star</button>
          </div>
          <span>{language}</span>&nbsp;
          <span>Updated on {moment(updated_at).format('DD MMM YYYY')}</span>
        </div>
      );
    });
  }
  return 'No repositories found';
};

const Repository = () => {
  const [repos, setRepos] = useState([]);
  console.log(repos);

  useEffect(() => {
    const getRepositories = async () => {
      const { response, error } = await RepositoryService.getRepositories();
      if (!error) {
        setRepos(response);
      } else {
        //show error
        alert('Error fetching repositories');
      }
    };
    getRepositories();
  }, []);

  const onRepoSearch = (e) => {
    e.stopPropogation();
    e.preventDefault();
  };

  return (
    <div className="main">
      <input
        className="bp3-input search"
        type="text"
        placeholder="Find a repository..."
        onClick={onRepoSearch}
      />
      {renderRepos(repos)}
    </div>
  );
};

export default Repository;
