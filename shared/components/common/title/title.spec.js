/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Title from './title';

describe('components/common/Title', () => {
	describe('state/render', () => {
		it('should render title', () => {
			const wrapper = shallow(<Title title="Hello World"/>);
			expect(wrapper.contains(<span>Hello World</span>)).to.be.true;
		});
	});
});
