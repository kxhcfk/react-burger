import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useCallback, useEffect, useMemo } from 'react';
import Loader from '../../components/Loader/Loader';
import {
	deleteIngredientAction,
	setIngredientAction,
} from "../../store/actions/ingredient";
import { getIngredients } from '../../store/actions/ingredients';
import Modal from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { useDispatch, useSelector } from "../../store/store";
import { ROUTES } from '../../utils/constatns';
import styles from './IngredientDetailsPage.module.css';
import classNames from 'classnames';

const IngredientDetailsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const { id } = useParams();
	const location = useLocation();
	
	const isModal = !!location.state?.background;
	
	const { closeModal } = useModal();
	
	const { ingredients, ingredientsRequest } = useSelector(store => store.ingredients);
	
	const ingredient = useMemo(() => (
		ingredients.find(ingredient => ingredient._id === id)
	), [id, ingredients]);
	
	const handleCloseIngredientDetail = useCallback(() => {
		if (isModal) {
			closeModal();
		}
		
		dispatch(deleteIngredientAction());
		
		navigate(ROUTES.main);
	}, []);
	
	useEffect(() => {
		if (!ingredients.length) {
			dispatch(getIngredients());
		} else {
			dispatch(setIngredientAction(ingredient));
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