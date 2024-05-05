import { ArticleDetailsCommentScheme } from './ArticleDetailsCommentScheme';
import { ArticleDetailsRecommendationsScheme } from './ArticleDetailsRecommendationsScheme';

export interface ArticleDetailsPageScheme {
	comments: ArticleDetailsCommentScheme;
	recommendations: ArticleDetailsRecommendationsScheme;
}
