import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useCallback, useEffect, useMemo } from 'react';
import Loader from '../../components/Loader/Loader';
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from '../../services/actions/ingredient';
import { getIngredients } from '../../services/actions/ingredients';
import Modal from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { ROUTES } from '../../utils/constatns';
import styles from './IngredientDetailsPage.module.css';
import classNames from 'classnames';

const IngredientDetailsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const { id } = useParams();
	const location = useLocation();
	
	const isModal = !!location.state?.isModal;
	
	const { closeModal } = useModal();
	
	// @ts-ignore
	const { ingredients, ingredientsRequest } = useSelector(store => store.ingredients);
	
	const ingredient = useMemo(() => (
		// @ts-ignore
		ingredients.find(ingredient => ingredient._id === id)
	), [id, ingredients]);
	
	const handleCloseIngredientDetail = useCallback(() => {
		if (isModal) {
			closeModal();
		}
		
		dispatch({ type: DELETE_CURRENT_INGREDIENT });
		
		navigate(ROUTES.main);
	}, []);
	
	useEffect(() => {
		if (!ingredients.length) {
			// @ts-ignore
			dispatch(getIngredients());
		} else {
			dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
		}
	}, [ingredients]);
	
	return (
		<>
			{!ingredients.length || ingredientsRequest ? (
				<Loader/>
			) : (
				<>
					{isModal ? (
						<Modal
							title="Детали ингредиента"
							onClose={handleCloseIngredientDetail}
						>
							<IngredientDetails/>
						</Modal>
					) : (
						<div className="pt-30 pb-30">
							<h1 className={classNames(styles.title, "text text_type_main-large")}>Детали ингредиента</h1>
							
							<IngredientDetails/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default IngredientDetailsPage;