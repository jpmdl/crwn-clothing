import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  // the name 'isLoading' is necessary because is the name our page is expecting
  isLoading: selectIsCollectionFetching
});

// the same as:
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//     WithSpinner(CollectionsOverview)
//   );

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
