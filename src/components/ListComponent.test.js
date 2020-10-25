import React from 'react';
import { render } from '@testing-library/react';
import ListComponent from './ListComponent';

test('Check list component variations', async () => {
  //first check if loading renders
  var { getByTestId } = render(<ListComponent loading={true} error={null} list={null} source="Google" />)
  const loading = getByTestId('fontAwesomeLoadingIcon');
  expect(loading).toBeInTheDocument();
  //then check if error is shown
  var { getByTestId } = render(<ListComponent loading={false} error="Lorem ipsum..." list={null} source="Google" />)
  const errorMsg = getByTestId('errortext');
  expect(errorMsg).toBeInTheDocument();
  //finally check if the list is rendered
  var { getByText, getAllByTestId } = render(<ListComponent 
    loading={false} 
    error={null}
    source="Google"
    list={
      [
        {
          title: "\u003cb\u003eBiologics License Applications\u003c/b\u003e (\u003cb\u003eBLA\u003c/b\u003e) Process (CBER) | FDA",
          link: "https://www.fda.gov/vaccines-blood-biologics/development-approval-process-cber/biologics-license-applications-bla-process-cber",
          description: "Feb 2, 2018 \u003cb\u003e...\u003c/b\u003e The \u003cb\u003eBiologics License Application\u003c/b\u003e (\u003cb\u003eBLA\u003c/b\u003e) is a request for permission to introduce, \u003cbr\u003e\nor deliver for introduction, a biologic product into interstate&nbsp;..."
        },
        {
          title: "\u003cb\u003eBLA\u003c/b\u003e - Wikipedia",
          link: "https://en.wikipedia.org/wiki/BLA",
          description: "\u003cb\u003eBLA\u003c/b\u003e may refer to: \u003cb\u003eBLA\u003c/b\u003e. The IATA code for the General José Antonio Anzoátegui \u003cbr\u003e\nInternational Airport at Barcelona, Venezuela; Baltimore and Annapolis&nbsp;..."
        },
        {
          title: "Therapeutic Biologics Applications (\u003cb\u003eBLA\u003c/b\u003e) | FDA",
          link: "https://www.fda.gov/drugs/types-applications/therapeutic-biologics-applications-bla",
          description: "Feb 24, 2020 \u003cb\u003e...\u003c/b\u003e Therapeutic Biologics Applications (\u003cb\u003eBLA\u003c/b\u003e) &middot; Monoclonal antibodies for in-vivo use &middot; \u003cbr\u003e\nCytokines, growth factors, enzymes, immunomodulators; and&nbsp;..."
        },
        {
          title: "D-Block &amp; S-te-Fan - \u003cb\u003eBla Bla\u003c/b\u003e - YouTube",
          link: "https://www.youtube.com/watch?v=X5x1BKAn6GU",
          description: "Mar 12, 2020 \u003cb\u003e...\u003c/b\u003e Official video for D-Block &amp; S-te-Fan - \u003cb\u003eBla Bla\u003c/b\u003e Free Download : https://dbstf.com/\u003cbr\u003e\nblabla Disclaimer: All the rights and credits we don&#39;t own go to&nbsp;..."
        },
        {
          title: "#\u003cb\u003ebla\u003c/b\u003e hashtag on Instagram • Photos and Videos",
          link: "https://www.instagram.com/explore/tags/bla/?hl=en",
          description: "315.6k Posts - See Instagram photos and videos from &#39;\u003cb\u003ebla\u003c/b\u003e&#39; hashtag."
        }
      ]
    }
    />)
  const googleListTitle = getByText('Google List');
  const googleList = getAllByTestId('listcards');
  expect(googleListTitle).toBeInTheDocument();
  expect(googleList[0]).toBeInTheDocument();
});
