import { FC, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { useModal } from "../../hooks/useModal";
import { getCurrentOrder } from "../../store/actions/currentOrder";
import { useDispatch, useSelector } from "../../store/store";
import { ROUTES } from "../../utils/constatns";
import styles from "./ProfileOrderDetailPage.module.css";

const ProfileOrderDetailPage: FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentOrder } = useSelector(state => state.currentOrder);
    
    const { closeModal } = useModal();
    
    const handleModalClose = useCallback(() => {
        closeModal();
        
        navigate(ROUTES.profileOrders);
    }, []);
    
    useEffect(() => {
        if (id) {
            dispatch(getCurrentOrder(id));
        }
    }, [id]);
    
    if (!currentOrder) {
        return <Loader/>;
    }
    
    return (
        <>
            {location.state?.background ? (
                <Modal onClose={handleModalClose}>
                    <OrderCard
                        order={currentOrder}
                        baseUrlLink={ROUTES.profileOrders}
                        details={true}
                    />
                </Modal>
            ) : (
                <main className={styles.root}>
                    <div className={styles.container}>
                        <OrderCard
                            order={currentOrder}
                            baseUrlLink={ROUTES.profileOrders}
                            details={true}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export { ProfileOrderDetailPage };