import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
  return (
    <span className="noData">
      User doesn’t have any repositories that match.
    </span>
  );
};

const Repository = () => {
  const [repos, setRepos] = useState([]);
  const [repoclones, setRepoClones] = useState([]);

  const getRepositories = async () => {
    const { response, error } = await RepositoryService.getRepositories();
    if (!error) {
      setRepos(response);
      setRepoClones(response);
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
    e.stopPropagation();
    e.preventDefault();
    const query = e?.target?.value;
    console.log('query', query);
    //ideally this should be server side search, for simplicity adding client side search
    if (query) {
      const matchedRepos = repoclones.filter((repo) =>
        repo.name.toLowerCase().includes(query.toLowerCase())
      );
      setRepos(matchedRepos);
    } else {
      getRepositories();
    }
  };

  //this method needs to be debounced to avoid mutliple triggers in short duration
  //this method of select is based on specific attribute e.g. fork, archived of the repo object
  const onRepoTypeSelect = (option) => {
    const query = option?.value;
    //ideally this should be server side search, for simplicity adding client side search
    if (query) {
      const matchedRepos = repoclones.filter((repo) => {
        return repo[query] === true;
      });
      setRepos(matchedRepos);
    }
  };

  //this method needs to be debounced to avoid mutliple triggers in short duration
  const onLanguageSearch = (option) => {
    const query = option?.value;
    console.log('query', query);
    //ideally this should be server side search, for simplicity adding client side search
    if (query) {
      const matchedRepos = repoclones.filter(
        (repo) => repo.language?.toLowerCase() === query.toLowerCase()
      );
      setRepos(matchedRepos);
    }
  };

  const renderRepoSearch = () => {
    return (
      <input
        className="bp3-input search"
        type="text"
        placeholder="Find a repository..."
        onChange={onRepoSearch}
      />
    );
  };

  const renderRepoTypeSelector = () => {
    const options = [
      { value: '', label: 'All' },
      { value: 'sources', label: 'Sources' },
      { value: 'fork', label: 'Forks' },
      { value: 'archived', label: 'Archived' },
      { value: 'mirrors', label: 'Mirrors' },
    ];
    return (
      <Select
        options={options}
        className="repoTypeSelector"
        placeholder={'Type'}
        onChange={onRepoTypeSelect}
      />
    );
  };

  const renderLanguageSelector = () => {
    const repoclone = repos.slice(0);
    const languages = Array.from(
      new Set(
        repoclone
          .map((repo) => repo.language)
          .filter((languages) => languages !== null)
      )
    );
    const options = languages.map((language) => {
      return { label: language, value: language.toLowerCase() };
    });
    return (
      <Select
        options={options}
        className="repoTypeSelector"
        placeholder={'Language'}
        onChange={onLanguageSearch}
      />
    );
  };

  return (
    <div className="main">
      <div className="filterSection">
        {renderRepoSearch()}
        {renderRepoTypeSelector()}
        {renderLanguageSelector()}
      </div>
      {renderRepos(repos)}
    </div>
  );
};

export default Repository;
